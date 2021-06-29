export interface CreateProfileDTO {
  name: string;
  middlename: string;
  surname: string;
  birthday: string;
}

export interface EditProfileDTO {
  name?: string;
  middlename?: string;
  surname?: string;
  birthday?: string;
  id: string;
}

export interface GetProfileDTO {
  id: string;
}

export interface DeleteProfileDTO {
  id: string;
}
