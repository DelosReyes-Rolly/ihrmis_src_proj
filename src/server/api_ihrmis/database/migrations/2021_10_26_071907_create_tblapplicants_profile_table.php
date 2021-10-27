<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblapplicantsProfileTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tblapplicants_profile', function (Blueprint $table) {
            $table->increments('app_id')->comment('Applicant ID. A unique identification of records.');
            $table->string('app_emp_no', 15)->comment('Employee number. Employee ID
number in its current agency.');
            $table->string('app_nm_last', 50)->comment('Last name or surname.');
            $table->string('app_nm_first', 50)->comment('First or given name.');
            $table->string('app_nm_mid', 50)->comment('Middle name in full.');
            $table->string('app_nm_extn', 10)->comment('Name extension, if any. (e.g. Jr., Sr.)');
            $table->date('app_birth_date')->comment('Birthdate or date of birth.');
            $table->string('app_birth_place', 50)->comment('Birthplace or place of birth.');
            $table->char('app_sex', 1)->comment('Sex or biological and physiological state. [M-Male, F-Female].');
            $table->string('app_blood_type', 3)->comment('Blood type. [AB+, AB-, A+, A-, B+, B-, O+, O-]');
            $table->char('app_civil_status', 2)->comment('Civil status. [SG-Single, MR-Married, WD-Widowed, SP-Separated, OT-Others]');
            $table->string('app_civil_others', 50)->comment('Specific civil status if others.');
            $table->double('app_height', 6, 3)->unsigned()->comment('Height in meters.');
            $table->double('app_weight', 6, 3)->unsigned()->comment('Weight in kilograms.');
            $table->string('app_gsis', 20)->comment('GSIS ID number.');
            $table->string('app_pagibig', 20)->comment('Pag-IBIG (Home Development Mutual Fund) ID number.');
            $table->string('app_philhealth', 20)->comment('PhilHealth (Philippine Health Insurance Corp.) ID number.');
            $table->string('app_sss', 20)->comment('SSS (Social Security System) ID number.');
            $table->string('app_tin', 20)->comment('Tax identification number.');
            $table->unsignedTinyInteger('app_filipino')->comment('Indicator if applicant is Filipino. [0-No, 1-Yes].');
            $table->unsignedTinyInteger('app_dual_type')->comment('Type of dual citizenship, if applicable. [0-NA, 1-Birth, 2-Naturalization].');
            $table->char('app_dual_cny_id', 2)->comment('Applicant\'s country if not Filipino or other country if dual citizen. Represented as two-letter country codes defined in ISO 3166-1.');
            $table->string('app_resident_addr')->comment('Residential address. Consolidated in this order: House/Block/Lot No., Street, Subdivision/Village, Barangay, City/Municipality, Province, and Zipcode; separated by a character \'|\'.');
            $table->string('app_permanent_addr')->comment('Permanent address. Consolidated in this order: House/Block/Lot No., Street, Subdivision/Village, Barangay, City/Municipality, Province, and Zipcode; separated by a character \'|\'.');
            $table->string('app_tel_no', 50)->comment('Telephone number/s or landline contact numbers.');
            $table->string('app_mobile_no', 50)->comment('Mobile number/s.');
            $table->string('app_email_addr', 150)->comment('Email address.');
            $table->string('app_id_issued', 50)->comment('Government issued ID (i.e. Passport, GSIS, SSS, PRC, Driver\'s License, etc.) submitted.');
            $table->string('app_id_no', 20)->comment('Number of the government issued ID submitted.');
            $table->string('app_id_dateplace', 50)->comment('Date and place of issuance indicated in the government issued ID.');
            $table->string('app_photo')->nullable()->comment('File and directory path of the applicant\'s photo.');
            $table->unsignedTinyInteger('app_agree')->comment('Indicator if applicant acknowledge and sworn to the declaration of true statement. [0-No, 1-Yes].');
            $table->integer('is_verified')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tblapplicants_profile');
    }
}
