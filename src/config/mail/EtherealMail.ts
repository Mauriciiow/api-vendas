import nodemailer from 'nodemailer'
import HandlebarsMailTemplate from './HandlebarsTemplateMail';

interface IEmailContact{
 name: string;
 email: string;
}

interface ITemplateVariable{
    [key: string]: string | number
}

interface IParseMailTemplate{
    file: string;
    variables: ITemplateVariable;
}

interface ISendMail{
    to: IEmailContact;
    from?: IEmailContact;
    subject: string;
    templateData: IParseMailTemplate;
}



class EtherealMail {
    static async sendMail({to, from, subject, templateData}:ISendMail): Promise<void>{
        const account = await nodemailer.createTestAccount()
        const mailTemplate = new HandlebarsMailTemplate()

        const transporter = nodemailer.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: account.user,
                pass: account.pass
            },
            tls: {
                rejectUnauthorized: false
            }
        })
        const message = await transporter.sendMail({
            from: {
                name: from?.name || 'Equipe api vendas',
                address: from?.email || 'equipe@apivendas.com.br'
            },
            to: {
                name: to.name, 
                address: to.email
            },
            subject,
            html: await mailTemplate.parse(templateData)

        })
        console.log('Message sent: %s', message.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
        
    }
}

export default EtherealMail