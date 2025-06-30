import { Job, Worker } from "bullmq";
import { NotificationDto } from "../dto/notification.dto";
import { MAILER_QUEUE } from "../queues/mailer.queue";
import { getRedisConnObj } from "../config/redis.config";
import { MAILER_PAYLOAD } from "../producers/email.producer";
import { renderMailTemplate } from "../templates/templates.handler";
import { sendEmail } from "../services/mailer.service";
import logger from "../config/logger.config";

export function setUpMailerWorker() {
    const emailProcessor = new Worker<NotificationDto>(
        MAILER_QUEUE, // Name of queue
        async (job: Job) => {   // Process function
            if (job.name !== MAILER_PAYLOAD) {
                throw new Error("Invalid job name")
            }
            
            // call service layer here
            const payload = job.data;
            console.log(`Processing email for: ${JSON.stringify(payload)}`);

            const emailContent = await renderMailTemplate(payload.templateId, payload.params);
            await sendEmail(payload.to, payload.subject, emailContent);
            logger.info(`Email has sent to ${payload.to} with subject ${payload.subject}`);
        },
        {       // Config object
            connection: getRedisConnObj()
        }
    )
    
    emailProcessor.on("failed", () => {
        console.error("Email processing failed");
    });
    
    emailProcessor.on("completed", () => {
        console.log("Email processing completed successfully");
    });
}