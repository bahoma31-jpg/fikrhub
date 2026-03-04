export async function verifyOwnership(
    resourceOwnerId: string,
    sessionUserId: string
): Promise<boolean> {
    return resourceOwnerId === sessionUserId;
}
