# +Finanças

O +Finanças é um aplicativo que tem como objetivo te ajudar na controle das suas transações de entrada e saída.  
[Vídeo sobre o app +Finanças](https://drive.google.com/file/d/124doJTTExpu3lM8DKf4eMq4rOv9u4Au8/view?usp=sharing)  

<p align="center">
    <img src="https://gitlab.com/Freire712/transactions-manager/-/blob/master/samples/screenshots/screenshot-1.png" alt="Tour" width="200"/>
    <img src="https://gitlab.com/Freire712/transactions-manager/-/blob/master/samples/screenshots/screenshot-2.png" alt="Home" width="200"/>
    <img src="https://gitlab.com/Freire712/transactions-manager/-/blob/master/samples/screenshots/screenshot-3.png" alt="Cadastrar nova transação" width="200"/>
    <img src="https://gitlab.com/Freire712/transactions-manager/-/blob/master/samples/screenshots/screenshot-4.png" alt="Listagem de transações" width="200"/>
</p>



## Desenvolvendo localmente
- Execute `yarn` para rodar instalar as dependências.
- Execute `yarn ios` para rodar a aplicação iOS ou `yarn android` para rodar no android.
- É recomendado fazer o download da ferramenta **Realm Studio**. A mesma está disponível para download  [aqui](https://github.com/realm/realm-studio/releases)


## Testes
- Os testes são desenvolvindos utilizando a biblioteca `react-native-testing-library`.
- Para extender as capacidades do
- Para executar os testes basta executar `yarn test`

## Principais tecnologias utilizadas
- React Native (0.63)
- RealmDB
- Typescript
- Styled-Components
- React Navigation
- Context API



## Próximos passos
[ ] Integração com back-end para autenticação online  
[ ] Armazenamento dos dados online  
[ ] Sincronização entre os dados armazenados localmente e os dados remotos  
[ ] Gráficos sobre saldo e transações  


## Troubleshooting
1. Realm faz o build falhar
   1. `yarn remove realm`
   2. `rm -rf node_modules`
   3. `cd ios && pod install`
   4. `cd .. `
   5. `yarn`
   6. `cd ios && pod install`
