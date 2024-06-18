import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import { LocalFileReader } from './readers/LocalFileReader';
import { RemoteFileReader } from './readers/RemoteFileReader';
import { FileReaderContext } from './readers/FileReaderContext';
import { analyzeContent } from './utils/analyzer';

const fastify = Fastify({
    logger: true
});

fastify.post('/analyze', async (request: FastifyRequest<{ Body: { path: string } }>, reply: FastifyReply) => {
    const path = request.body.path
    if (!path) {
        return reply.status(400).send({ error: 'Please provide a file path or URL as body parameter "path".' });
    }

    if (!path.endsWith('.txt')) {
        return reply.status(400).send({ error: 'Only .txt files are allowed.' });
    }

    let strategy;
    if (path.startsWith('http://') || path.startsWith('https://')) {
        strategy = new RemoteFileReader();
    } else {
        strategy = new LocalFileReader();
    }

    const fileReaderContext = new FileReaderContext(strategy);

    try {
        const content = await fileReaderContext.read(path);
        const analysis = analyzeContent(content);
        return reply.send(analysis);
    } catch (error: any) {
        if (error.message?.includes('File not found')) {
            return reply.status(404).send({ error: 'File not found', details: 'Please provide another path or URL' });
        }
        else {
            return reply.status(500).send({ error: 'Error reading or analyzing file', details: error.message });
        }
    }
});

const start = async () => {
    try {
        const port = process.env.PORT || '9000';
        await fastify.listen({ port: parseInt(port), host: '0.0.0.0'});
        fastify.log.info(`Server listening on http://localhost:${port}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();