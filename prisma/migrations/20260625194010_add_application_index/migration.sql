-- CreateIndex
CREATE INDEX "applications_job_seeker_profile_id_idx" ON "applications"("job_seeker_profile_id");

-- CreateIndex
CREATE INDEX "applications_job_id_status_idx" ON "applications"("job_id", "status");
