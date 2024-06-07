export interface UserDto {
  firstName: string;
  username?: string;
  phoneNumber: string;
  chatId: number;
}

export interface ITimer {
  hours: number;
  minutes: number;
  seconds: number;
}
