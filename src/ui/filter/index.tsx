import { Dispatch, SetStateAction, useState } from "react";
import {
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Row,
  Col,
  Card,
  Space,
} from "antd";
import styles from "./index.module.css";

const { Option } = Select;

export interface FilterField {
  type: "text" | "number" | "select" | "date";
  label: string;
  key: string;
  placeholder?: string;
  options?: string[];
}

interface FilterComponentProps {
  filters: FilterField[];
  setFilters: Dispatch<SetStateAction<Record<string, any>>>;
}

function FilterComponent({ filters, setFilters }: FilterComponentProps) {
  const [filterValues, setFilterValues] = useState<Record<string, any>>({});

  const handleInputChange = (key: string, value: any) => {
    setFilterValues((prevValues) => ({ ...prevValues, [key]: value }));
  };

  const handleApplyFilters = () => {
    setFilters(filterValues);
  };

  const handleClearFilters = () => {
    setFilterValues({});
    setFilters({});
  };

  return (
    <Card bordered={true} className={styles["filter-card"]}>
      <Form layout="vertical">
        <Row gutter={[16, 16]}>
          {filters.map((filter) => (
            <Col key={filter.key} xs={24} sm={12} md={8} lg={8}>
              {filter.type === "text" && (
                <Form.Item label={filter.label}>
                  <Input
                    placeholder={filter.placeholder || `Enter ${filter.label}`}
                    value={filterValues[filter.key] || ""}
                    onChange={(e) =>
                      handleInputChange(filter.key, e.target.value)
                    }
                    className={styles["form-item"]}
                  />
                </Form.Item>
              )}
              {filter.type === "number" && (
                <Form.Item label={filter.label}>
                  <Input
                    type="number"
                    placeholder={filter.placeholder || `Enter ${filter.label}`}
                    value={filterValues[filter.key] || ""}
                    onChange={(e) =>
                      handleInputChange(filter.key, Number(e.target.value))
                    }
                    className={styles["form-item"]}
                  />
                </Form.Item>
              )}
              {filter.type === "select" && (
                <Form.Item label={filter.label}>
                  <Select
                    placeholder={filter.placeholder || `Select ${filter.label}`}
                    value={filterValues[filter.key] || undefined}
                    onChange={(value) => handleInputChange(filter.key, value)}
                    allowClear
                  >
                    {filter.options?.map((option) => (
                      <Option key={option} value={option}>
                        {option}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              )}
              {filter.type === "date" && (
                <Form.Item label={filter.label}>
                  <DatePicker
                    placeholder={filter.placeholder || `Select ${filter.label}`}
                    value={filterValues[filter.key] || null}
                    onChange={(date) => handleInputChange(filter.key, date)}
                    className={styles["form-item"]}
                  />
                </Form.Item>
              )}
            </Col>
          ))}
        </Row>
        <Space className={styles["button-space"]}>
          <Button type="primary" onClick={handleApplyFilters}>
            Apply Filters
          </Button>
          <Button onClick={handleClearFilters}>Clear Filters</Button>
        </Space>
      </Form>
    </Card>
  );
}

export default FilterComponent;
