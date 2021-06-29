export interface CreatePetProfileDTO {
  name: string;
  birthday: string;
}

export interface EditPetProfileDTO {
  name?: string;
  birthday?: string;
  id: string;
}

export interface GetPetProfileDTO {
  id: string;
}

export interface DeletePetProfileDTO {
  id: string;
}
