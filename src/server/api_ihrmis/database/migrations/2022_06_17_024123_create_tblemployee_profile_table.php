<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblemployeeProfileTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tblemployee_profile', function (Blueprint $table) {
            $table->unsignedInteger('emp_id')->primary()->comment('Employee ID. Identifies the related employee.');
            $table->date('emp_birth_date')->comment('Birthdate or date of birth.');
            $table->string('emp_birth_place', 50)->comment('Birthplace or place of birth.');
            $table->char('emp_sex', 1)->comment('Sex or biological and physiological state. [M-Male, F-Female].');
            $table->string('emp_blood_type', 3)->comment('Blood type. [AB+, AB-, A+, A-, B+, B-, O+, O-]');
            $table->char('emp_civil_status', 2)->comment('Civil status. [SG-Single, MR-Married, WD-Widowed, SP-Separated, OT-Others]');
            $table->string('emp_civil_others', 50)->comment('Specific civil status if others.');
            $table->double('emp_height', 6, 3)->unsigned()->comment('Height in meters.');
            $table->double('emp_weight', 6, 3)->unsigned()->comment('Weight in kilograms.');
            $table->string('emp_gsis', 20)->comment('GSIS ID number.');
            $table->string('emp_pagibig', 20)->comment('Pag-IBIG (Home Development Mutual Fund) ID number.');
            $table->string('emp_philhealth', 20)->comment('PhilHealth (Philippine Health Insurance Corp.) ID number.');
            $table->string('emp_sss', 20)->comment('SSS (Social Security System) ID number.');
            $table->string('emp_tin', 20)->comment('Tax identification number.');
            $table->unsignedTinyInteger('emp_filipino')->comment('Indicator if applicant is Filipino. [0-No, 1-Yes].');
            $table->unsignedTinyInteger('emp_dual_type')->comment('Type of dual citizenship, if applicable. [0-NA, 1-Birth, 2-Naturalization].');
            $table->char('emp_dual_cny_id', 2)->comment('Employee\'s country if not Filipino or other country if dual citizen. Represented as two-letter country codes defined in ISO 3166-1.');
            $table->string('emp_resident_addr')->comment('Residential address. Consolidated in this order: House/Block/Lot No., Street, Subdivision/Village, Barangay, City/Municipality, Province, and Zipcode; separated by a character \'|\'.');
            $table->string('emp_permanent_addr')->comment('Permanent address. Consolidated in this order: House/Block/Lot No., Street, Subdivision/Village, Barangay, City/Municipality, Province, and Zipcode; separated by a character \'|\'.');
            $table->string('emp_tel_no', 50)->comment('Telephone number/s or landline contact numbers.');
            $table->string('emp_mobile_no', 50)->comment('Mobile number/s.');
            $table->string('emp_email_addr', 100)->comment('Personal email address.');
            $table->string('emp_id_issued', 50)->comment('Government issued ID (i.e. Passport, GSIS, SSS, PRC, Driver\'s License, etc.) submitted.');
            $table->string('emp_id_no', 20)->comment('Number of the government issued ID submitted.');
            $table->string('emp_id_dateplace', 50)->comment('Date and place of issuance indicated in the government issued ID.');
            $table->string('emp_photo')->comment('File and directory path of the employee\'s photo.');
            $table->unsignedTinyInteger('emp_agree')->comment('Indicator if employee acknowledge and sworn to the declaration of true statement. [0-No, 1-Yes].');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tblemployee_profile');
    }
}
