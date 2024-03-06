export interface JobplanetCateDataType {
  label: string;
  name: string;
  type?: string;
  value?: number;
  data: JobplanetCateDataType[];
}

export interface JobplanetCateResponseType {
  status: string;
  code: number;
  data: Record<string, JobplanetCateDataType[]>;
}

export type ProgrammersCateResponseType = Array<{ id: number; name: string }>;

export interface RememberCateDataType {
  name: string;
  subs: Array<{ id: number; name: string; suggested_skills: Array<{ name: string }> }>;
}

export interface RememberCateResponseType {
  code: string;
  data: Record<string, RememberCateDataType[]>;
  errors?: any;
  messeage?: string | null;
}

export interface JumpitCateResponseType {
  code: string;
  result: {
    jobCategory: Array<{
      id: number;
      name: string;
      recommendTechStacks: Array<{ name: string; imagePath: string}>
    }>,
    [key: string]: any[]
  };
  errors?: any;
  messeage?: string | null;
}
