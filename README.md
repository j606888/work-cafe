# Work Cafe

### Questions

* 在 AdminRoute, UserRoute 會從 AuthContext 拿出 user 來做身份驗證。但是因為驗證會需要發 API 初始化，所以初始化之前 user = null。就會導致被倒轉到 login page。現在透過一個 isInit 來判斷。感覺有更好的做法
