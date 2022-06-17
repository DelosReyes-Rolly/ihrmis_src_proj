<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblemailTemplatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tblemail_templates', function (Blueprint $table) {
            $table->increments('eml_id')->comment('Email Template ID. A unique identification of records.');
            $table->char('eml_type', 3)->comment('Type of email to determine the cluster the template belongs to. [USR-Notice to End-User, NIR-Notice to Next-in-Rank, PEE-Schedule of Pre-employment Examination, INT-Schedule of PSB Interview, PSY-Schedule of Psycho Examination, PER-Pre-employment Examination Results, DOC	-Completion of Documentary Requirements, ASS-Notification for End-User Assessment, BCK-Background Check, DSQ-Notification of Disqualification, PSB-Notification to HRMPSB]');
            $table->string('eml_name', 150)->comment('Name for an email template for easy identification.');
            $table->text('eml_message')->comment('Email message content pattern for the template.');
            $table->string('eml_link')->comment('The common URL that can be inserted in the message to redirect the user to a specific link associated with the email type.');
            $table->timestamp('eml_time')->useCurrent()->comment('Date and time the template is created or updated to identify the latest template to be used.');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tblemail_templates');
    }
}
