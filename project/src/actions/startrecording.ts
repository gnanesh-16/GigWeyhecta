import { Client, Functions } from 'appwrite';


export async function startRecording() {
    // Initialize Appwrite client
    const client = new Client();
    client
        .setEndpoint('https://cloud.appwrite.io/v1')
        .setProject('67751ee3000c278646a8'); // Replace with your project ID


    const functions = new Functions(client);

    // Call the Appwrite function to start recording
    await functions.createExecution('6777f5e00037d882be09');
}


export async function stopRecording() {
    // Initialize Appwrite client
    const client = new Client();
    client
        .setEndpoint('https://cloud.appwrite.io/v1')
        .setProject('67751ee3000c278646a8'); // Replace with your project ID


    const functions = new Functions(client);

    // Call the Appwrite function to start recording
    await functions.createExecution('6777f917002e7cf0ba09');
}

export async function replayRecording() {
    // Initialize Appwrite client
    const client = new Client();
    client
        .setEndpoint('https://cloud.appwrite.io/v1')
        .setProject('67751ee3000c278646a8'); // Replace with your project ID


    const functions = new Functions(client);

    // Call the Appwrite function to start recording
    await functions.createExecution('67780757001eee01e165');
}