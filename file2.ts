import { injectable} from 'inversify'

@injectable()
export class OtherService {
   
    public DoThing(fred: string): string {
        let bob = fred.length;
        return bob.toString();
    }
}
