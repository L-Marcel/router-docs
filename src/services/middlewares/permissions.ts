export async function permissions(
  req: ReqWithUser, 
  res: Res, 
  next: () => Promise<void>,
  functionToVerify: (id?: string, userId?: string) => Promise<boolean>,
  idToVerify?: string
) {
  const { id } = req.body;
  const { id: userId } = req.user;

  const havePermissions = await functionToVerify(idToVerify ?? String(id), userId);

  if(!havePermissions) {
    return res.status(401).json({
      message: "Unauthorized"
    });
  };

  await next();
};