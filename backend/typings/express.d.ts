declare module "express" { // declare module "express-serve-static-core"
  export interface Request {
    user: any,
    userId: any
  }
  export interface RequestHandler {
    use: any
  }
  export interface Application {
    use: any
  }
  export interface Response {
    use: any
  }
}