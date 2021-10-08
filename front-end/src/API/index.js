import onSignup from "./user/onSignup";
import retrieveUser from "./user/retrieveUser";
import onLogin from "./user/onLogin";
import onUpdateProfile from "./user/onUpdateProfile";
import onNewPassword from "./user/onNewPassword";
import testAuth from "./user/testAuth";
import onSignout from "./user/onSignout";
import retrieveItems from "./dir/retrieveItems";
import openFile from "./dir/openFile";
import addFile from "./dir/addFile";
import addFolder from "./dir/addFolder";
import deleteFolder from "./dir/deleteFolder";
import deleteFile from "./dir/deleteFile";
import deleteAll from "./dir/deleteAll";
import renewAccess from "./renewAccess";

const API = {
  renewAccess,
  user: {
    onSignup,
    retrieveUser,
    onLogin,
    onUpdateProfile,
    onNewPassword,
    testAuth,
    onSignout,
  },
  dir: {
    retrieveItems,
    openFile,
    addFile,
    addFolder,
    deleteFolder,
    deleteFile,
    deleteAll,
  },
};

export default API;
