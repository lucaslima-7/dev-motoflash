import pageAccess from "../../auth/AuthorizationRoles";

const navMenus = [
  {
    'id': 'users',
    'title': 'Usuários',
    'type': 'item',
    'url': '/users',
    auth: pageAccess.users,
    'icon': 'people'
  },
  {
    'id': 'courriers',
    'title': 'Entregadores',
    'type': 'item',
    'url': '/courriers',
    auth: pageAccess.courriers,
    'icon': 'menu'
  },
]

export default navMenus