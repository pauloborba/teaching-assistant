import request = require('request-promise');

const URLBase = 'http://localhost:3000/';

describe('O servidor', () => {
    let servidor: any;

    beforeAll(() => servidor = require('../ta-server'));

    afterAll(() => servidor.closeServer());

    it('retorna resumos de turmas', () => {
        const descricoes: string = [ '2017.2', '2019.1' ].join(',');
        const resposta: any = [
            { descricao: '2017.2', media: 6.7, reprovacao: 0.3 },
            { descricao: '2019.1', media: 6.8, reprovacao: 0.1 }
        ];

        const options: any = {
            uri: URLBase + 'comparacao-de-desempenho',
            qs: {
                'turmas': descricoes
            },
            headers: {
                'User-Agent': 'Request-Promise'
            },
            json: true
        };

        return request(options)
            .then(res => {
                expect(res).toEqual(resposta);
            })
            .catch(err => {
                expect(err).toBeNull();
            });
    });
});