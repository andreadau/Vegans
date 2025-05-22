// server/utils/mongodb.ts
import { MongoClient, Db, ServerApiVersion } from 'mongodb'; // Added ServerApiVersion for completeness

let clientPromiseInstance: Promise<MongoClient> | null = null;

// This function will initialize the MongoDB client promise only when it's first needed.
function getClientPromise(): Promise<MongoClient> {
    if (clientPromiseInstance) {
        return clientPromiseInstance;
    }

    const config = useRuntimeConfig(); // Call useRuntimeConfig() inside the function
    const uri = config.mongodbUri;

    if (!uri) {
        console.error('ERROR: MONGODB_URI environment variable is not defined in .env or nuxt.config.ts');
        // This will cause a 500 error on the server if URI is missing
        throw new Error('MONGODB_URI is not properly configured.');
    }

    // This pattern helps reuse the connection in serverless environments
    // and handle HMR (Hot Module Replacement) correctly in development.
    // @ts-ignore - For accessing global in development
    if (process.env.NODE_ENV === 'development' && global._mongoClientPromise) {
        // @ts-ignore
        clientPromiseInstance = global._mongoClientPromise;
    } else {
        const client = new MongoClient(uri, {
        });
        clientPromiseInstance = client.connect(); // client.connect() returns Promise<MongoClient>

        if (process.env.NODE_ENV === 'development') {
            // @ts-ignore
            global._mongoClientPromise = clientPromiseInstance;
        }
    }

    // Ensure clientPromiseInstance is not null before returning.
    // This should theoretically always be true if the above logic completes
    // and no exceptions are thrown (like the MONGODB_URI missing).
    if (!clientPromiseInstance) {
        // This would indicate a very unexpected issue.
        console.error('FATAL: MongoDB client promise could not be initialized after connection attempt.');
        throw new Error('Failed to initialize MongoDB client promise.');
    }

    return clientPromiseInstance;
}

/**
 * Gets the connected MongoClient instance.
 * The connection promise is cached and reused.
 */
export async function getMongoClient(): Promise<MongoClient> {
    return getClientPromise();
}

/**
 * Gets a specific database instance from the connected client.
 * @param dbName - The name of the database to connect to.
 */
export async function getDb(dbName: string = "Cluster0"): Promise<Db> {
    // For example, if your database is named "myAppData":
    // export async function getDb(dbName: string = "myAppData"): Promise<Db> {

    if (!dbName || dbName === "Cluster0" || dbName === "Cluster0") {
        console.warn(`WARNING: getDb is being called with a potentially incorrect database name: "${dbName}". Please ensure this is your intended database name and not your cluster name.`);
    }

    const client = await getMongoClient(); // This will ensure the client is connected and config is read
    return client.db(dbName);
}