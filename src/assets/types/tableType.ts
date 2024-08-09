export interface TableTypes {
  [key: string]: string | null;
}

export interface TableHeadTypes {
  name: string;
  value: string;
  initialWidth?: number;
}

export interface CourseTypes {
  scheduleId?: number;
  schDeptAlias?: string;
  curiNo?: string;
  classNo?: string;
  schCollegeAlias?: string;
  curiNm?: string;
  curiLangNm?: string | null;
  curiTypeCdNm?: string;
  sltDomainCdNm?: string;
  tmNum?: string;
  studentYear?: string;
  corsUnitGrpCdNm?: string;
  manageDeptNm?: string;
  lesnEmp?: string;
  lesnTime?: string;
  lesnRoom?: string;
  cyberTypeCdNm?: string;
  internshipTypeCdNm?: string | null;
  inoutSubCdtExchangeYn?: string | null;
  remark?: string;
}
