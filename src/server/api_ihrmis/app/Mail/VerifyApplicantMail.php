<?php

namespace App\Mail;

use Barryvdh\DomPDF\Facade as PDF;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class VerifyApplicantMail extends Mailable
{
    use Queueable, SerializesModels;

    public $someDetails;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($details)
    {
        $this->someDetails = $details;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $pdf = PDF::loadView('verifyEmailPdf', $this->someDetails);
        return $this->from($this->someDetails['from_email'], $this->someDetails['recruiter'])->subject($this->someDetails['subject'])
                    ->view('verifyEmail')->attachData($pdf->output(), "verify-email.pdf");
    }
}
