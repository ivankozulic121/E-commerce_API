import { Controller, Body, Post, Req, Res,Get, UseGuards } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { json } from 'body-parser';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/user/user.decorator';
import { UserEntity } from 'src/user/user/user.entity';

@Controller('stripe')
//@UseGuards(AuthGuard())
export class StripeController {

    constructor( private readonly stripeService: StripeService) {}

   

    @UseGuards(AuthGuard())
    @Post('create-checkout-session')

    async createCheckoutSession( @Body() body:{cartID: number}, @User() user: UserEntity) {

        try {
            const session = await this.stripeService.createCheckoutSession(body.cartID, user);
            return { session: session.url };
        }
        catch(error) {
            return { error: error.message}
        }
    }

    @Post('webhook')
    
    async handleWebhook(@Req() req: Request, @Res() res: Response) {
        return this.stripeService.handleWebhook(req, res);
}

    @Get('success')

    async paymentSuccessfull(@Res() res: Response) {
        return {"success": true}
    }
}
