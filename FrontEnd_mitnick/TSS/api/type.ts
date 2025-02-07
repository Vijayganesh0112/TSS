// types.ts
export type RootStackParamList = {
    // Define the available routes here
    home: undefined;
    otp: { mobileNumber: string };
    login: { mobileNumber: string };
  };
  