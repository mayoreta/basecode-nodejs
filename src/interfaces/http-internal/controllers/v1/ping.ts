const ping = async (req: any, res: any, next: any) => {
  try {
    res.send({
      status: true,
      message: 'Success',
      data: true,
    })
  } catch (error) {
    next(error)
  }
}

export = ping
