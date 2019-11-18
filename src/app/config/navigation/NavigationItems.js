import React from 'react';
import pageAccess from "../../auth/AuthorizationRoles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaypal } from "@fortawesome/free-brands-svg-icons";
import { faUsers, faMotorcycle, faTaxi, faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';

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
    'title': 'Motoristas',
    'type': 'item',
    'url': '/couriers',
    auth: pageAccess.couriers,
    'icon': () => <FontAwesomeIcon icon={faMotorcycle} />
  },
  {
    'id': 'couriers_lastlocation',
    'title': 'Localização',
    'type': 'item',
    'url': '/location',
    auth: pageAccess.location,
    'icon': () => <FontAwesomeIcon icon={faMapMarkedAlt} />
  },
  {
    'id': 'trips',
    'title': 'Viagens',
    'type': 'item',
    'url': '/trips',
    auth: pageAccess.trips,
    'icon': () => <FontAwesomeIcon icon={faTaxi} />
  },
  {
    'id': 'payments',
    'title': 'Pagamentos',
    'type': 'item',
    'url': '/payments',
    auth: pageAccess.payments,
    'icon': () => <FontAwesomeIcon icon={faPaypal} />
  },
]

export default navMenus