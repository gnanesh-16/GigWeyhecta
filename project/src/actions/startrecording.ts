import { Client, Functions } from 'appwrite';


export async function startRecording() {
    // Initialize Appwrite client
    const client = new Client();
    client
        .setEndpoint('https://cloud.appwrite.io/v1')
        .setProject('67751ee3000c278646a8'); // Replace with your project ID


    const functions = new Functions(client);

    // Call the Appwrite function to start recording
    await functions.createExecution('677924e50032306bd8c1');
    const response = await fetch('/start-recording', {
        method: 'POST'
    });

    if (!response.ok) {
        throw new Error('Failed to start recording');
    }

    const data = await response.json();
    console.log(data.message);
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
    const response = await fetch('http://localhost:5173/stop-recording', {
        method: 'POST'
    });

    if (!response.ok) {
        throw new Error('Failed to stop recording');
    }

    const data = await response.json();
    console.log(data.message);
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