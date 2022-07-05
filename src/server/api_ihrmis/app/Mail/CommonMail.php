<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class CommonMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($details)
    {
        $this->details = $details;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $mail = $this->details;
        $email = $this->from(env("MAIL_FROM_ADDRESS"))->subject($mail['message_type'])->view('mail.commonMail', ['details' => $mail]);
        foreach ($mail['file'] as $value) {
            $email->attach($value->getRealPath(), [
                'as' => $value->getClientOriginalName(),
                'mime' => $value->getMimeType()
            ]);
        }
        return $email;
        // return $this->view('view.name');
    }
}
