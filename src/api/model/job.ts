export interface JobDto {
  id: number;
  title: string;
  description: string;
  location: string;
  status: string;
  publishDate: string;
  applications: ApplicationDto[];
}

export interface NewJobDto {
  title: string;
  description: string;
  location: string;
  publishDate: string;
}

export interface ApplicationDto {
  id: number;
  candidateDisplayName: string;
  status: string;
}


