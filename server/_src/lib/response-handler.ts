import { Response } from "express";

export class ResponseHandler {
  static created(
    res: Response,
    statusCode: number,
    data: any,
    message: string
  ) {
    return res.status(statusCode).json({ message, data, status: "success" });
  }

  static ok(res: Response, statusCode: number, data: any, message: string) {
    return res.status(statusCode).json({ message, data, status: "success" });
  }

  static auth(res: Response, data: any, message: string) {
    const cookieOptions = {
      expires: new Date(Date.now() + 60 * 60 * 1000),
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "none" as const,
      secure: true,
    };

    return res
      .cookie("access_token", data.accessToken, cookieOptions)
      .json({ message, data });
  }

  static logout(res: Response, message: string) {
    return res.clearCookie("access_token").json({ message, status: "success" });
  }
}
