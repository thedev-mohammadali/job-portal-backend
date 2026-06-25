-- CreateTable
CREATE TABLE "job_required_skills" (
    "job_id" UUID NOT NULL,
    "skill_id" UUID NOT NULL,

    CONSTRAINT "job_required_skills_pkey" PRIMARY KEY ("job_id","skill_id")
);

-- CreateIndex
CREATE INDEX "job_required_skills_skill_id_idx" ON "job_required_skills"("skill_id");

-- CreateIndex
CREATE INDEX "job_seeker_skills_skill_id_idx" ON "job_seeker_skills"("skill_id");

-- AddForeignKey
ALTER TABLE "job_required_skills" ADD CONSTRAINT "job_required_skills_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "jobs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_required_skills" ADD CONSTRAINT "job_required_skills_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "skills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
