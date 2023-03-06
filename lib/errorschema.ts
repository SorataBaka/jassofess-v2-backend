export class HTTPError extends Error {
	public code: string;
	public status: number;
	public error: any;
	constructor(message: string, status: number, code: string, error: any) {
		super(message);
		this.code = code;
		this.status = status;
		this.error = error;
	}
}
