import React from 'react';
import pageAccess from "../../auth/AuthorizationRoles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaypal } from "@fortawesome/free-brands-svg-icons";
import { faUsers, faMotorcycle, faMapMarkerAlt, faCog } from '@fortawesome/free-solid-svg-icons';

const navMenus = [
  {
    'id': 'users',
    'title': 'Usuários',
    'type': 'item',
    'url': '/users',
    auth: pageAccess.users,
    'icon': () => <FontAwesomeIcon icon={faUsers} />
  },
  {
    'id': 'couriers',
    'title': 'Motoboys',
    'type': 'item',
    'url': '/couriers',
    auth: pageAccess.couriers,
    'icon': () => <FontAwesomeIcon icon={faMotorcycle} />
  },
  {
    'id': 'workOrders',
    'title': 'Corridas',
    'type': 'item',
    'url': '/workOrders',
    auth: pageAccess.workOrders,
    'icon': () => <FontAwesomeIcon icon={faMapMarkerAlt} />
  },
  {
    'id': 'payments',
    'title': 'Pagamentos',
    'type': 'item',
    'url': '/payments',
    auth: pageAccess.payments,
    'icon': () => <FontAwesomeIcon icon={faPaypal} />
  },
  {
    'id': 'configuration',
    'title': 'Configurações',
    'type': 'item',
    'url': '/configurations',
    auth: pageAccess.config,
    'icon': () => <FontAwesomeIcon icon={faCog} />
  }
]

export default navMenus