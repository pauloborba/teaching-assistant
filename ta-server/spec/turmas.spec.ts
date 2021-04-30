// import { Turma } from '../../common/turma';
// import { Turmas } from '../turmas';

// describe('Turmas:', () => {
//     const turmas: Turmas = new Turmas();

//     describe('getResumos', () => {
//         let descricoes: string[];
//         let resumos: any[];

//         // beforeAll(() => {
//         //     descricoes = [ '2017.2', '2018.1', '2018.2', '2019.1', '2019.2' ];
//         //     descricoes.forEach(descricao => turmas.cadastrarTurma(new Turma(descricao)));
//         //     resumos = turmas.getResumos(descricoes);
//         // });

//         // afterAll(() => descricoes.forEach(descricao => turmas.removerTurma(descricao)));
        
//         it('retorna resumos com descrição, média e índice de reprovação', () => {
//             resumos.forEach(resumo => {
//                 expect(resumo.descricao).toBeDefined();
//                 expect(resumo.media).toBeDefined();
//                 expect(resumo.reprovacao).toBeDefined();
//             });
//         });

//         it('retorna um resumo para cada descrição de turma', () => {
//             expect(resumos.length).toBe(descricoes.length);
//             resumos.forEach(resumo => {
//                 const descricao = descricoes.find(descricao => descricao === resumo.descricao);
//                 expect(descricao).toBeTruthy();
//             });
//         });

//         it('retorna índices de reprovação válidos', () => {
//             resumos.forEach(resumo => {
//                 expect(resumo.reprovacao).toBeGreaterThanOrEqual(0);
//                 expect(resumo.reprovacao).toBeLessThanOrEqual(1);
//             });
//         });
//     });
// });
