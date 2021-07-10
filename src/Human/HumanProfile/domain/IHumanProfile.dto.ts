export interface CreateHumanProfileDTO {
  name: string;
  middlename: string;
  surname: string;
  birthday: string;
}

export interface EditHumanProfileDTO {
  name?: string;
  middlename?: string;
  surname?: string;
  birthday?: string;
  id: string;
}

export interface GetHumanProfileDTO {
  id: string;
}

export interface DeleteHumanProfileDTO {
  id: string;
}
