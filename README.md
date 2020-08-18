# +Finanças

O +Finanças é um aplicativo que tem como objetivo te ajudar na controle das suas transações de entrada e saída.  
[Vídeo sobre o app +Finanças](https://drive.google.com/file/d/124doJTTExpu3lM8DKf4eMq4rOv9u4Au8/view?usp=sharing)  

## Screenshots
<p align="center">
<img src="/samples/screenshots/screenshot-5.png"  width="200">
<img src="/samples/screenshots/screenshot-1.png"  width="200">
<img src="/samples/screenshots/screenshot-2.png"  width="200">
<img src="/samples/screenshots/screenshot-3.png"  width="200">
<img src="/samples/screenshots/screenshot-4.png"  width="200">
</p>



## Desenvolvendo localmente
- Execute `yarn` para rodar instalar as dependências.
- Execute `yarn ios` para rodar a aplicação iOS ou `yarn android` para rodar no android.
- É recomendado fazer o download da ferramenta **Realm Studio**. A mesma está disponível para download  [aqui](https://github.com/realm/realm-studio/releases)
<img src="https://gblobscdn.gitbook.com/assets%2F-L-nWFFFG5HNhz4YeOI_%2F-LGCcT4Y80DggHA2oNL1%2F-LGCdN0s54D2D7aTDXzg%2Fstudio-landing.png?alt=media&token=718f106d-1667-4584-903d-f89a63653283"  width="400">


## Testes
- Os testes são desenvolvindos utilizando a biblioteca `react-native-testing-library`.
- Para extender as capacidades do Jest foi utiliza a biblioteca `@testing-library/jest-native`
- Para executar os testes basta rodar `yarn test`

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
