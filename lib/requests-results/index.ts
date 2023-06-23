export interface RequestResult {
  SUCCESS: string;
  DATA_CONFLICT: string;
  BAD_CREDENTIALS: string;
  BAD_REQUEST: string;
  BAD_RESPONSE: string;
  FETCH_ERROR: string;
  UNKNOW_ERROR: string;
}

export const genericResultMsg: RequestResult = {
  SUCCESS: "Requisição efetuada com sucesso",
  DATA_CONFLICT:
    "Dados enviados na requisição estão conflitando com os contidos no servidor",
  BAD_CREDENTIALS: "Você precisa estar logado",
  BAD_REQUEST: "Requisição HTTP inválida ou corrompida",
  BAD_RESPONSE: "Servidor respondeu de forma inesperada",
  FETCH_ERROR: "Servidor parece estar offline. Tente mais tarde",
  UNKNOW_ERROR: "Erro desconhecido",
};

export const loginResultMsg = {
  SUCCESS: "Login efetuado com sucesso",
  BAD_CREDENTIALS: "Email ou Senha parecem estar errados",
  ...genericResultMsg,
};

export const getChatMessagesResultMsg: RequestResult = {
  SUCCESS: "Mensagens carregadas com sucesso",
  ...genericResultMsg,
};

export const postChatMessageResultMsg: RequestResult = {
  SUCCESS: "Mensagem enviada com sucesso",
  ...genericResultMsg,
};

export const updateChatMessageResultMsg: RequestResult = {
  SUCCESS: "Mensagem atualizada com sucesso",
  ...genericResultMsg,
};

export const deleteChatMessageResultMsg: RequestResult = {
  SUCCESS: "Mensagem deletada com sucesso",
  ...genericResultMsg,
};
