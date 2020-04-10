export interface AddImageDto {
  mimetype: string;
  originalname: string;
  fieldname: string;
  encoding: string;
  size: number;
  buffer: Buffer;
  destination: string;
}
