import { Body, Controller, Get, Patch, Path, Post, Query, Request, Route, Security, Tags, ValidateError } from 'tsoa'
import { inject } from 'inversify'
import { OtherService } from './file2'

@Route('/intake/v1')
@Security('bearer')
@Tags('v1')
export class LocalController extends Controller {
    constructor(
        @inject(Symbol.for('other_service')) protected oService: OtherService,
    ) {
        super()
    }

    protected oService2: OtherService = new OtherService();

    @Get('/thingsimple')
    async getIntakeAppointmentsSimple(@Query('personId') personId?: string): Promise<any>
    {
        // This flow works because it is not cross file.
        const thisAlwaysWorks = this.DoThing(personId ?? "fred")

        // This flow does not work, presumably because of the weird syntax in the constructor
        const thisNeverWorks = await this.oService.DoThing(personId ?? "fred")

        // This flow uses a standard class variable and therefore semgrep seems to detect it fine
        const thisWorksBecauseStandardVar = await this.oService2.DoThing(personId ?? "fred")
   }

   public DoThing(fred: string): string {
       let bob = fred.length;
       return bob.toString();
   }
}