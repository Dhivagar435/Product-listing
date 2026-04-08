import { GlobalException } from "./GlobalExpection";



export class UserNotFoundExpection extends GlobalException {

   constructor(name: string, message: string) {
      super(name, message)
   }
}