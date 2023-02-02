# Light Game

  Um Jogo simples de memória onde o usuário deve clicar nas mesmas janelas
  previamente acesas da animação(seguindo a mesma sequência).
  
  ## Proposta
  A proposta principal, como 2o projeto, é de aumentar progressivamente a 
  implementação, responsabilidade, relevância, e atuação do código JS.
  
  Através de um jogo, se alcança tal objetivo, com grande controle e manipulação 
  de animações, interações de usuário, e exibição de conteúdo.

  ## Aplicação
  Em resumo, a aplicação gera uma sequência de números randômicos, com tamanho e chances de erro proporcionais à fase atual.

  Previne a geração prematura da sequência, repetições e valores excedentes às janelas, acendendo-as na ordem respectiva à sequência.
  
  Aguarda o posterior acionamento sequencial e idêntico das mesmas, ou, o cancelamento do jogo.(click, teclado ou touch)

  Diversos controles são realizados antes, durante e após essa animação, tais como:

  - Prevenção ou liberação de acionamento e foco de botões e janelas
  - Checagem de cancelamento prematuro da animação e liberação de memória
  - Exibição ou ocultação de botões e texto pertinentes ao momento

  Também conta com navegação via teclado, bem como o controle de interação sobre eles.

  ## Basta clicar neste link <a href="https://pauloosawa.github.io/LightGame">Light Game - Jogo de Memória</a> para jogar

  ## Descrições Adicionais
  Quanto a aplicação, alguns pontos relevantes foram considerados:

   - Atenção à experiência do usuário
   - Prevenção de erros e interações indesejadas
   - Atenção à performance e memória da aplicação
   - Interface planejada a várias telas e dispositivos

  As animações não visam efeitos visuais, mas sim a interface do usuário.

  Possuem a função principal de evitar desnecessariamente:

   - Rolagem de página
   - Perda de foco
   - Interações indesejadas
   - ViewPort incompleta

  Secundariamente, o projeto procura se diferenciar em relação ao tipo, 
  design, interface e propósito da aplicação quanto aos demais.

  Sua semelhança ao projeto anterior se limita ao CSS e JS nativos, 
  utilizando apenas 03 imagens com tamanho total inferior a 15 kbytes.

  Por fim, testes adicionais em dispositivos móveis antigos motivaram a 
  implementação prévia da imagem de janela quebrada não aparente, 

  por apresentar atraso de carregamento na primeira animação de erro ocorrida.