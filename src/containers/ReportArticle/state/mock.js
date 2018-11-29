export const reportPayload = {
  type: 'Harassment',
  description: 'This article was full of harassment I want to report it',
};

export const reportMalPayload = {
  type: 'Harassment',
};

export const fetchTypesResponse = {
  status: "success",
  data: {
    spam: "Spam",
    harassment: "Harassment",
    hate_speech: "Hate speech",
    inappropriate_content: "Inappropriate Content",
    threats_violence_incitement: "Threats of violence and incitement",
  },
};

export const errorResponse = {
  status: "error",
  data: {
    error: [
      "You cannot report an article more than once.",
    ],
  },
};

export const successResponse = {
  message: "Your report has been received. You will receive a confirmation email shortly.",
};

export const errorResp = {
  status: "error",
  data: {
    description: [
      "This field may not be blank.",
    ],
  },
};
export const initialState = {
  reportTypes: fetchTypesResponse.data,
  isReporting: true,
  errors: "",
  message: "",
  success: false,
  hasError: false,
};
export const user = {
  username: '4fr0c0d3',
  image: 'https://avatars3.githubusercontent.com/u/25629064?s=460&v=4',
  email: 'ngigemoffat@gmail.com',
  password: 'Password1!',
};
