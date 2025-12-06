export async function registration() {
    if (process.env.NEXT_RUNTIME === 'node.js') {
        const { server } = await import('./mock/node');   
        server.listen();
    }
}