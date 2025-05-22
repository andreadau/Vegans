// server/api/contact.post.ts
import { getDb } from '~/server/utils/mongodb'; // Correct path to your utility
import { z, ZodError } from 'zod'; // For server-side validation

// Define a schema for validating the incoming data
// This should match the structure of your `formData` on the client-side
const contactFormSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }).max(100),
  lastName: z.string().min(1, { message: "Last name is required" }).max(100),
  company: z.string().max(100).optional().nullable(), // Optional and can be null or empty string
  serviceType: z.string().min(1, { message: "Service type is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().max(30).optional().nullable(), // Optional
  agreedToPolicy: z.boolean().refine(val => val === true, {
    message: "You must agree to the Privacy Policy.",
  }),
  // Add any other fields from your form here
});

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    // Validate the data
    const validationResult = contactFormSchema.safeParse(body);

    if (!validationResult.success) {
      // If validation fails, throw an error with structured details
      // The client-side $fetch will catch this and error.data will contain this payload
      console.warn('Validation Error:', validationResult.error.issues);
      throw createError({
        statusCode: 400, // Bad Request
        statusMessage: 'Validation Failed', // General status message
        data: { // Custom data payload
          message: 'Please correct the errors in the form.', // User-friendly message
          errors: validationResult.error.issues.map(issue => ({
            field: issue.path.join('.'), // e.g., "firstName", "email"
            message: issue.message
          }))
        }
      });
    }

    // If validation is successful, `validatedData` will contain the typed and validated data
    const validatedData = validationResult.data;

    const db = await getDb("contactFormDataBase"); // Ensure this is your actual database name
    const contactsCollection = db.collection("contacts"); // Or your preferred collection name, e.g., "formSubmissions"

    // Prepare the document to be inserted
    const submissionDocument = {
      ...validatedData,
      submittedAt: new Date(), // Add a server-side timestamp

    };

    const result = await contactsCollection.insertOne(submissionDocument);

    // Set HTTP status code for successful creation
    setResponseStatus(event, 201); // 201 Created

    return {
      success: true,
      message: 'Form submitted successfully!',
      submissionId: result.insertedId, // Send back the ID of the inserted document
    };

  } catch (error: any) {
    // Log the detailed error on the server for debugging
    console.error('API Error - /api/contact.post.ts:', error);

    // If it's a ZodError specifically (though createError above should handle it)
    if (error instanceof ZodError) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Validation Failed (Zod)',
        data: {
          message: 'Form data is invalid.',
          errors: error.issues.map(issue => ({
            field: issue.path.join('.'),
            message: issue.message
          }))
        }
      });
    }

    // If the error was already a structured H3Error (like the one from createError)
    if (error.data && error.statusCode) {
      // Re-throw it so Nuxt handles it correctly
      throw error;
    }

    // For other unexpected errors, return a generic 500 error
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      data: { // Custom data payload
        message: 'An unexpected error occurred while processing your request. Please try again later.',
        // Do not send error.message or error.stack to the client in production for security
      }
    });
  }
});