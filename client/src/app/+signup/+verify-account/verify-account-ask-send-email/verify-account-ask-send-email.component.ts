import { Component, OnInit } from '@angular/core'
import { Notifier, RedirectService, ServerService, UserService } from '@app/core'
import { FormReactive, FormValidatorService, UserValidatorsService } from '@app/shared/shared-forms'
import { ServerConfig } from '@shared/models'

@Component({
  selector: 'my-verify-account-ask-send-email',
  templateUrl: './verify-account-ask-send-email.component.html',
  styleUrls: [ './verify-account-ask-send-email.component.scss' ]
})

export class VerifyAccountAskSendEmailComponent extends FormReactive implements OnInit {
  private serverConfig: ServerConfig

  constructor (
    protected formValidatorService: FormValidatorService,
    private userValidatorsService: UserValidatorsService,
    private userService: UserService,
    private serverService: ServerService,
    private notifier: Notifier,
    private redirectService: RedirectService
    ) {
    super()
  }

  get requiresEmailVerification () {
    return this.serverConfig.signup.requiresEmailVerification
  }

  ngOnInit () {
    this.serverConfig = this.serverService.getTmpConfig()
    this.serverService.getConfig()
        .subscribe(config => this.serverConfig = config)

    this.buildForm({
      'verify-email-email': this.userValidatorsService.USER_EMAIL
    })
  }

  askSendVerifyEmail () {
    const email = this.form.value['verify-email-email']
    this.userService.askSendVerifyEmail(email)
      .subscribe(
        () => {
          this.notifier.success($localize`An email with verification link will be sent to ${email}.`)
          this.redirectService.redirectToHomepage()
        },

        err => {
          this.notifier.error(err.message)
        }
      )
  }
}
