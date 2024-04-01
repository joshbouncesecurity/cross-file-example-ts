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

    @Get('/thingsimple')
    async getIntakeAppointmentsSimple(@Query('personId') personId?: string): Promise<any>
    {
        const fred = this.DoThing(personId ?? "fred")
        const appointments = await this.oService.DoThing(personId ?? "fred")
   }

   public DoThing(fred: string): string {
       let bob = fred.length;
       return bob.toString();
   }
}