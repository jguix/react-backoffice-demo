import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ApplicationStore } from '../../../store/store';
import { Customer } from '../../customer/customer.types';
import { customerCommands } from '../customer.commands';
import { useHistory } from 'react-router-dom';

export const RnCustomer: FC = () => {
  const history = useHistory();
  const { id: idString } = useParams<{ id: string }>();
  const customerId = (idString && parseInt(idString)) || undefined;
  const customer = useSelector<ApplicationStore, Customer | undefined>((state) => {
    return (customerId && state.entities.customers.byId[customerId]) || undefined;
  });
  const emptyCustomer = { address: '', email: '', name: '' } as Customer;

  const [isLoading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState<string>();
  const [isError, setError] = useState(false);
  const [modifiedCustomer, setModifiedCustomer] = useState<Customer>(emptyCustomer);

  useEffect(() => {
    if (customerId) {
      setLoadingStatus(true, 'Loading customer...');
      customerCommands.loadCustomer(customerId).then(
        () => setLoadingStatus(false),
        () => setError(true)
      );
    }
  }, [customerId]);

  useEffect(() => {
    customer && setModifiedCustomer(customer);
  }, [customer]);

  const setLoadingStatus = (status: boolean, message?: string) => {
    setLoading(status);
    message && setLoadingMessage(message);
  };

  const onFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    const field = event.target.name;
    const value = event.target.value;
    modifiedCustomer && setModifiedCustomer({ ...modifiedCustomer, [field]: value });
  };

  const navigateBack = () => history.goBack();
  const navigateToCustomers = () => history.push('/');

  const onSave = () => {
    if (customer) {
      setLoadingStatus(true, 'Updating customer...');
      modifiedCustomer &&
        customerCommands
          .updateCustomer(modifiedCustomer)
          .then(
            () => setLoadingStatus(false),
            () => setError(true)
          )
          .then(navigateBack);
    } else {
      setLoadingStatus(true, 'Saving customer...');
      modifiedCustomer &&
        customerCommands
          .saveCustomer(modifiedCustomer)
          .then(
            () => setLoadingStatus(false),
            () => setError(true)
          )
          .then(navigateBack);
    }
  };

  const onDelete = () => {
    setLoadingStatus(true, 'Deleting customer...');
    customer &&
      customerCommands
        .deleteCustomer(customer.id)
        .then(
          () => setLoadingStatus(false),
          () => setError(true)
        )
        .then(navigateToCustomers);
  };

  if (isLoading === true) {
    return <div>{loadingMessage}</div>;
  }

  if (isError) {
    return <div>Error loading customer, please refresh page.</div>;
  }

  return (
    <>
      <h1>Edit customer</h1>
      {modifiedCustomer && (
        <form onSubmit={onSave}>
          {modifiedCustomer.id && (
            <div>
              <label>
                Id:&nbsp;
                <input type="text" value={modifiedCustomer.id} disabled />
              </label>
            </div>
          )}
          <div>
            <label>
              Name:&nbsp;
              <input type="text" name="name" value={modifiedCustomer.name} onChange={onFieldChange} />
            </label>
          </div>
          <div>
            <label>
              Email:&nbsp;
              <input type="text" name="email" value={modifiedCustomer.email} onChange={onFieldChange} />
            </label>
          </div>
          <div>
            <label>
              Address:&nbsp;
              <input type="text" name="address" value={modifiedCustomer.address} onChange={onFieldChange} />
            </label>
          </div>
          <hr />
          <button type="submit">Save</button>&nbsp;
          {customerId && <button onClick={onDelete}>Delete</button>}
        </form>
      )}
    </>
  );
};
