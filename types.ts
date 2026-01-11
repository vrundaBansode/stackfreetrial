
export interface ErrorExplanation {
  meaning: string;
  likelyCauses: string[];
  checkFirst: string[];
  commonFixes: string[];
  detectedLanguage: string;
  detectedFramework: string;
}

export type Language = 
  | 'Auto-detect' | 'JavaScript' | 'TypeScript' | 'Python' | 'Java' 
  | 'C++' | 'C#' | 'Go' | 'Rust' | 'Ruby' | 'PHP' | 'Swift' 
  | 'Kotlin' | 'Dart' | 'Shell' | 'SQL' | 'Other';

export type Framework = 
  | 'Auto-detect' | 'React' | 'Next.js' | 'Vue' | 'Angular' | 'Svelte' 
  | 'Express' | 'NestJS' | 'Django' | 'Flask' | 'FastAPI' | 'Spring Boot' 
  | 'Laravel' | 'Ruby on Rails' | 'Flutter' | 'React Native' | 'None';

export interface ErrorContext {
  language: Language;
  framework: Framework;
}

export interface ExplainRequest {
  errorText: string;
  context: ErrorContext;
}
