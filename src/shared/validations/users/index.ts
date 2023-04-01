import create from './create_user.validation';
import destroy from './delete_user.validation';
import login from './login.validation';
import update from './update_user.validation';
import check_token from './check_token.validation';

export default {
  create, destroy, login, update, check_token
}