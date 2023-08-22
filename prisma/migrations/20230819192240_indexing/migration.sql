-- CreateIndex
CREATE INDEX "DietPlan_startDate_endDate_profileId_idx" ON "DietPlan"("startDate", "endDate", "profileId");

-- CreateIndex
CREATE INDEX "Notification_userId_idx" ON "Notification"("userId");

-- CreateIndex
CREATE INDEX "Profile_userId_idx" ON "Profile"("userId");

-- CreateIndex
CREATE INDEX "Record_profileId_idx" ON "Record"("profileId");

-- CreateIndex
CREATE INDEX "UserMessage_messageId_recieverId_senderId_idx" ON "UserMessage"("messageId", "recieverId", "senderId");
