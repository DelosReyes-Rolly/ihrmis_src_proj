<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblcategoryGroupsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tblcategory_groups', function (Blueprint $table) {
            $table->tinyIncrements('grp_id')->comment('Group ID. A unique identification of records.');
            $table->string('grp_name', 150)->comment('Name of group/category/section.');
            $table->unsignedTinyInteger('grp_level')->comment('Level of examination or testing.');
            $table->char('grp_cluster', 2)->comment('Cluster where the group is classified. [RP, LD, PM, RR].	');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tblcategory_groups');
    }
}
